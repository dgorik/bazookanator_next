import ChatBox from './components/ChatBox'
import BrandComparison from './components/visuals/BrandComparison'

export default async function Member() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      {/* <div className="grid grid-cols-3 content-center gap-4"> */}
      <div className="border-4 border-grey-200">
        {' '}
        <BrandComparison />{' '}
      </div>
      {/* <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div>
        <div className="border-4 border-grey-200"> First Visual </div> */}
      {/* </div> */}
      <ChatBox />
    </div>
  )
}
