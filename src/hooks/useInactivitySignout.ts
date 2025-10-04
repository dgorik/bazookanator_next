"use client"

import { createClient } from '@/src/lib/client/supabase/client'
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';


const InactivityTimeout = 1000 * 60 * 30 
const LastActivityKey = 'lastActivityTimestamp'

const supabase = createClient()


function updateLastActivity() {
  localStorage.setItem(LastActivityKey, Date.now().toString())
}

export function useInactivitySignout() {
  const router = useRouter();
  const timeoutRef = useRef <number | null> (null); //this lets us store the timout ID across renders without causing re-renders

  const signOutUser = 
    useCallback(async () => {
        const lastActiveTime = localStorage.getItem(LastActivityKey)
        if (lastActiveTime) {
          const elapsed = Date.now() - parseInt(lastActiveTime, 10)
          if (elapsed >= InactivityTimeout) {
            await supabase.auth.signOut()
            localStorage.removeItem(LastActivityKey)
            router.replace('/auth/login?error=Your+session+has+expired,+please+log+in+again')
          }
        }
        else{
            return
        }
    }, [router])

const resetTimer = 
    useCallback(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        } 
        updateLastActivity();
        timeoutRef.current = window.setTimeout(signOutUser, InactivityTimeout)
  }, [signOutUser])

  useEffect(() => {
    resetTimer()
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })

    function handleStorageEvent(event: StorageEvent){
      // If another tab was active (updated the key), reset this tab's timer
      if (event.key === LastActivityKey) {
        console.log('Storage event detected, resetting timer');
        resetTimer();
      }
    };
    window.addEventListener('storage', handleStorageEvent);

    return () => {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      window.removeEventListener('storage', handleStorageEvent);
    }
  },[resetTimer])
}