import * as WebDataRocksReact from '@webdatarocks/react-webdatarocks'

export function WebDataRocksPivot() {
  const reportJson = {
    dataSource: {
      data: [
        {
          Product: 'Apple',
          Price: 2.5,
        },
        {
          Product: 'Cherry',
          Price: 5.25,
        },
      ],
    },
  }
  return (
    <div>
      <WebDataRocksReact.Pivot toolbar={true} report={reportJson} />
    </div>
  )
}
