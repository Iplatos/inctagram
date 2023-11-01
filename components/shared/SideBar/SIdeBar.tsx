import s from './SideBar.module.scss';

import home from '../../../assets/icons/home.svg';
import homeOutline from '../../../assets/icons/home-outline.svg';

console.log(homeOutline);
console.log(home);
export const SideBar = () => {
  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <button>
          <img alt={'home logo'} className={s.image} src={homeOutline.src} />
          Home
        </button>
        <button>Create</button>
        <button>My Profile</button>
        <button>Messenger</button>
        <button>Search</button>
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
