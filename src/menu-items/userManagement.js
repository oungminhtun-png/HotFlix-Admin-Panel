// assets
import { 
  UserOutlined, 
  TeamOutlined, 
  VideoCameraAddOutlined, 
  TagsOutlined,
  PictureOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
  StarOutlined,
  ThunderboltOutlined,
  PlaySquareOutlined,
  VideoCameraOutlined,
  FolderViewOutlined,
  YoutubeOutlined,
  PlayCircleOutlined,
  BellOutlined // Notification အတွက် Icon အသစ်
} from '@ant-design/icons';

const icons = {
  UserOutlined,
  TeamOutlined,
  VideoCameraAddOutlined, 
  TagsOutlined,           
  PictureOutlined,        
  UsergroupAddOutlined,   
  GlobalOutlined,         
  StarOutlined,           
  ThunderboltOutlined,
  PlaySquareOutlined,
  VideoCameraOutlined,
  FolderViewOutlined,
  YoutubeOutlined,
  PlayCircleOutlined,
  BellOutlined
};

const userManagement = {
  id: 'management',
  title: 'Content Management',
  type: 'group',
  children: [
    {
      id: 'users-list',
      title: 'Users List',
      type: 'item',
      url: '/users/list',
      icon: icons.UserOutlined
    },
    {
      id: 'groups-list',
      title: 'Groups List',
      type: 'item',
      url: '/groups/list',
      icon: icons.TeamOutlined
    },
    {
      id: 'notification-list', // Notification List အသစ်
      title: 'Notification',
      type: 'item',
      url: '/notification/list',
      icon: icons.BellOutlined
    },
    {
      id: 'banner-list',
      title: 'Banner List',
      type: 'item',
      url: '/banner/list',
      icon: icons.PictureOutlined
    },
    // --- Streaming Content Section ---
    {
      id: 'movie-list',
      title: 'Movie List',
      type: 'item',
      url: '/movie/list',
      icon: icons.PlaySquareOutlined
    },
    {
      id: 'movie-video-list',
      title: 'Movie Video List',
      type: 'item',
      url: '/movie-video/list',
      icon: icons.PlayCircleOutlined
    },
    {
      id: 'series-list',
      title: 'Series List',
      type: 'item',
      url: '/series/list',
      icon: icons.VideoCameraOutlined
    },
    {
      id: 'season-list',
      title: 'Season List',
      type: 'item',
      url: '/season/list',
      icon: icons.FolderViewOutlined
    },
    {
      id: 'episode-list',
      title: 'Episode List',
      type: 'item',
      url: '/episode/list',
      icon: icons.YoutubeOutlined
    },
    // --- Metadata & Settings ---
    {
      id: 'cast-list',
      title: 'Cast List',
      type: 'item',
      url: '/cast/list',
      icon: icons.VideoCameraAddOutlined
    },
    {
      id: 'genre-list',
      title: 'Genre List',
      type: 'item',
      url: '/genre/list',
      icon: icons.TagsOutlined
    },
    {
      id: 'director-list',
      title: 'Director List',
      type: 'item',
      url: '/director/list',
      icon: icons.UsergroupAddOutlined
    },
    {
      id: 'country-list',
      title: 'Country List',
      type: 'item',
      url: '/country/list',
      icon: icons.GlobalOutlined
    },
    {
      id: 'rating-list',
      title: 'Rating List',
      type: 'item',
      url: '/rating/list',
      icon: icons.StarOutlined
    },
    {
      id: 'premiere-list',
      title: 'Premiere List',
      type: 'item',
      url: '/premiere/list',
      icon: icons.ThunderboltOutlined
    }
  ]
};

export default userManagement;