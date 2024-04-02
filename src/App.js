import './App.css';
import UsersList from './Components/UsersList';
import { Route, Routes ,Link} from 'react-router-dom';
import TeamList from './Components/TeamList';


function App() {
  return (
    <div className='flex items-center justify-center my-10'>
      <div>      
        <div className='flex gap-10'>
          <Link to={'/'} className="text-2xl font-bold mb-4 cursor-pointer">Users List</Link> 
          <Link to={'/teams'} className="text-2xl font-bold mb-4 cursor-pointer">Teams</Link> 
        </div>
        <Routes>
          <Route path='/' element={<UsersList/>}/>
          <Route path='/teams' element={<TeamList/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
