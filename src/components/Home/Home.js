import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SideBar from '../SideBar/SideBar';
import SpaceXList from '../SpaceXList/SpaceXList';
import './Home.css';

const Home = () => {
    const [spaceXList, setSpaceXList] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [listPerPage] = useState(9);

    const indexOfLastSpaceX = currentPage * listPerPage;
    const indexOfFirstSpaceX = indexOfLastSpaceX - listPerPage;
    const currentSpaceX = spaceXList.slice(indexOfFirstSpaceX, indexOfLastSpaceX);


    useEffect(() => {
        fetch('https://api.spacexdata.com/v3/launches?limit=100')
            .then(res => res.json())
            .then(data => setSpaceXList(data))
    }, [])

    const handleYear = (year) => {
        fetch(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${year}`)
        .then(res => res.json())
        .then(data => setSpaceXList(data))
    }

    const handleLaunch = (condition) => {
        fetch(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=${condition}`)
        .then(res => res.json())
        .then(data => setSpaceXList(data))
    }

    const handleLanding = (condition) => {
        fetch(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=${condition}`)
        .then(res => res.json())
        .then(data => setSpaceXList(data))
    }

    const handleClearFilter = () => {
        fetch('https://api.spacexdata.com/v3/launches?limit=100')
        .then(res => res.json())
        .then(data => setSpaceXList(data))
    }

    //page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="home">
            <div className="container">
                <h5 className='py-4'>SpaceX Luanch Programme</h5>
                <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <SideBar handleYear={handleYear} handleLaunch={handleLaunch} handleLanding={handleLanding} handleClearFilter={handleClearFilter} key="abc"></SideBar>
                    </div>
                    <div className="col-md-10 col-sm-12">
                        <SpaceXList currentSpaceX={currentSpaceX}></SpaceXList>
                        <Pagination listPerPage={listPerPage} totalList={spaceXList.length} paginate={paginate} ></Pagination>
                    </div>
                </div>  
                <h6 className='text-center pb-4'>Developer by <span>Sarowar Hosen</span></h6>
            </div>
        </div>
    );
};

export default Home;