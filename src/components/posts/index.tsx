import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './style.css'; // Стилі для компонента
// import Filterr from './components/Filter'; 
import Cards from './components/Cards'
import Last from './components/Last/indexLast';
import Help from "./components/Help"


const App = () => (
  <div>
  <div className="app-container">
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <UserOutlined />
        <span>Application List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>

  <h1 className='whtnew'>Що нового?</h1>

    {/* Wrapper для фільтра і вертикальної лінії */}
    <div className="filter-wrapper">
      <div className="filter-container">
        {/* <Filterr onFilter={(values) => console.log(values)} /> */}
      </div>
      <div className="vertical-line" /> {/* Вертикальна лінія справа */}
    </div>
  </div>
  <Cards/>
    <Last/> 
    <Help/>



    
  </div>
);

export default App;

