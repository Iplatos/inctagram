import { useAppSelector } from '@/pages/api/store';
import BookmarkOutline from 'assets/icons/bookmark-outline.svg';
import HomeOutline from 'assets/icons/home-outline.svg';
import LogOutOutline from 'assets/icons/log-out-outline.svg';
import MessageCircleOutline from 'assets/icons/message-circle-outline.svg';
import PersonOutline from 'assets/icons/person-outline.svg';
import PlusSquareOutline from 'assets/icons/plus-square-outline.svg';
import SearchOutline from 'assets/icons/searchOutline.svg';
import TrendingUpOutline from 'assets/icons/trending-up-outline.svg';

import s from './sidebar.module.scss';

export const SideBar = () => {
  const { isLoggedIn } = useAppSelector(state => state.authReducer);

  if (!isLoggedIn) {
    return;
  }

  return (
    <div className={s.sidebarContainer}>
      <div className={s.buttonContainer}>
        <button>
          <HomeOutline className={s.svgAsComponent} />
          Home
        </button>

        <button>
          <PlusSquareOutline className={s.svgAsComponent} />
          Create
        </button>
        <button>
          <PersonOutline className={s.svgAsComponent} />
          My Profile
        </button>
        <button>
          <MessageCircleOutline className={s.svgAsComponent} />
          Messenger
        </button>
        <button>
          <SearchOutline className={s.svgAsComponent} />
          Search
        </button>
      </div>
      <div className={s.buttonContainer}>
        <button>
          <TrendingUpOutline className={s.svgAsComponent} />
          Statistics
        </button>
        <button>
          <BookmarkOutline className={s.svgAsComponent} />
          Favorites
        </button>
      </div>
      <div className={s.logOutButtonContainer}>
        <button>
          <LogOutOutline className={s.svgAsComponent} />
          Log Out
        </button>
      </div>
    </div>
  );
};
