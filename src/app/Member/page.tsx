import ChatBox from './components/ChatBox'
import Visual from './components/visuals/Visual'

export default async function Member() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="grid grid-cols-3 content-center gap-4">
        <div className="border-4 border-grey-200">
          {' '}
          <Visual />{' '}
        </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
      </div>
      <ChatBox />
    </div>
  )
}
