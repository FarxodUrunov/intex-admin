  import React from 'react';

  //styling
  import './AdminSearch.css';
   
   const AdminSearch = ()=> {
        return(
            <div className="a-search"> 
                <div className="wrap-search">
                <input id='search-input' type="search" placeholder="Найти" />
                <span></span>
                <i id='search-icon' className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        )
    }

    export default AdminSearch;