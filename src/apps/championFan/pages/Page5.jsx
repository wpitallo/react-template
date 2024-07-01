import { Cards } from '@components/cards/Cards'

const Page = ({ isPage1Visible }) => {
  return (
    <div>
      <Cards></Cards>
      {/* 
      <div className="container">
        <div className="column" style={{ background: 'grey', opacity: 0.9 }}>Column 1</div>
        <div className="column" style={{ background: 'pink', opacity: 0.9 }}>Column 2</div>
        <div className="column" style={{ background: 'grey', opacity: 0.9 }}>Column 3</div>
        <div className="column" style={{ background: 'pink', opacity: 0.9 }}>Column 4</div>
        <div className="column" style={{ background: 'grey', opacity: 0.9 }}>Column 5</div>
      </div> 
      */}
    </div>
  )
}

export default Page
