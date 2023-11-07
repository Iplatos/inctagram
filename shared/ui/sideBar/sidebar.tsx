import HomeOutline from 'assets/icons/home-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';

import s from './sidebar.module.scss';

export const SideBar = () => {
  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <button onMouseDown={() => console.log('asd')}>
          <HomeOutline className={s.svgAsComponent} />
          Home
        </button>
        <button>Create</button>
        <button>My Profile</button>
        <button>Messenger</button>
        <button>
          <SearchOutline className={s.svgAsComponent} />
          Search
        </button>
      </div>
      <div className={s.buttonContainer}>
        <button>Statistics</button>
        <button>Favorites</button>
      </div>
      <div className={s.logOutButtonContainer}>
        <button>Log Out</button>
      </div>
    </div>
  );
};
