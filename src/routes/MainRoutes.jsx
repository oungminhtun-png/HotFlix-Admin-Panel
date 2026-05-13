import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'components/AuthGuard';

// --- Dashboard & Extra ---
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// --- Users Components ---
const UsersList = Loadable(lazy(() => import('pages/users/view/UsersList')));
const Users_create = Loadable(lazy(() => import('pages/users/entry/Users_create')));
const UsersDetail = Loadable(lazy(() => import('pages/users/view/UsersDetail')));
const Users_update = Loadable(lazy(() => import('pages/users/entry/Users_update')));

// --- Groups Components ---
const GroupsList = Loadable(lazy(() => import('pages/groups/view/GroupsList')));
const Groups_create = Loadable(lazy(() => import('pages/groups/entry/Groups_create')));
const GroupsDetail = Loadable(lazy(() => import('pages/groups/view/GroupsDetail')));
const Groups_update = Loadable(lazy(() => import('pages/groups/entry/Groups_update')));

// --- Notification Components ---
const NotificationList = Loadable(lazy(() => import('pages/notification/view/NotificationList')));
const Notification_create = Loadable(lazy(() => import('pages/notification/entry/Notification_create')));
const NotificationDetail = Loadable(lazy(() => import('pages/notification/view/NotificationDetail')));
const Notification_update = Loadable(lazy(() => import('pages/notification/entry/Notification_update')));

// --- Banner Components ---
const BannerList = Loadable(lazy(() => import('pages/banner/view/BannerList')));
const Banner_create = Loadable(lazy(() => import('pages/banner/entry/Banner_create')));
const BannerDetail = Loadable(lazy(() => import('pages/banner/view/BannerDetail')));
const Banner_update = Loadable(lazy(() => import('pages/banner/entry/Banner_update')));

// --- Movie Components ---
const MovieList = Loadable(lazy(() => import('pages/movie/view/MovieList')));
const Movie_create = Loadable(lazy(() => import('pages/movie/entry/Movie_create')));
const MovieDetail = Loadable(lazy(() => import('pages/movie/view/MovieDetail')));
const Movie_update = Loadable(lazy(() => import('pages/movie/entry/Movie_update')));

// --- Movie Video Components ---
const MovieVideoList = Loadable(lazy(() => import('pages/movie-video/view/MovieVideoList')));
const MovieVideo_create = Loadable(lazy(() => import('pages/movie-video/entry/MovieVideo_create')));
const MovieVideoDetail = Loadable(lazy(() => import('pages/movie-video/view/MovieVideoDetail')));
const MovieVideo_update = Loadable(lazy(() => import('pages/movie-video/entry/MovieVideo_update')));

// --- Series Components ---
const SeriesList = Loadable(lazy(() => import('pages/series/view/SeriesList')));
const Series_create = Loadable(lazy(() => import('pages/series/entry/Series_create')));
const SeriesDetail = Loadable(lazy(() => import('pages/series/view/SeriesDetail')));
const Series_update = Loadable(lazy(() => import('pages/series/entry/Series_update')));

// --- Season Components ---
const SeasonList = Loadable(lazy(() => import('pages/season/view/SeasonList')));
const Season_create = Loadable(lazy(() => import('pages/season/entry/Season_create')));
const SeasonDetail = Loadable(lazy(() => import('pages/season/view/SeasonDetail')));
const Season_update = Loadable(lazy(() => import('pages/season/entry/Season_update')));

// --- Episode Components ---
const EpisodeList = Loadable(lazy(() => import('pages/episode/view/EpisodeList')));
const Episode_create = Loadable(lazy(() => import('pages/episode/entry/Episode_create')));
const EpisodeDetail = Loadable(lazy(() => import('pages/episode/view/EpisodeDetail')));
const Episode_update = Loadable(lazy(() => import('pages/episode/entry/Episode_update')));

// --- Cast Components ---
const CastList = Loadable(lazy(() => import('pages/cast/view/CastList')));
const Cast_create = Loadable(lazy(() => import('pages/cast/entry/Cast_create')));
const CastDetail = Loadable(lazy(() => import('pages/cast/view/CastDetail')));
const Cast_update = Loadable(lazy(() => import('pages/cast/entry/Cast_update')));

// --- Genre Components ---
const GenreList = Loadable(lazy(() => import('pages/genre/view/GenreList')));
const Genre_create = Loadable(lazy(() => import('pages/genre/entry/Genre_create')));
const GenreDetail = Loadable(lazy(() => import('pages/genre/view/GenreDetail')));
const Genre_update = Loadable(lazy(() => import('pages/genre/entry/Genre_update')));

// --- Director Components ---
const DirectorList = Loadable(lazy(() => import('pages/director/view/DirectorList')));
const Director_create = Loadable(lazy(() => import('pages/director/entry/Director_create')));
const DirectorDetail = Loadable(lazy(() => import('pages/director/view/DirectorDetail')));
const Director_update = Loadable(lazy(() => import('pages/director/entry/Director_update')));

// --- Premiere Components ---
const PremiereList = Loadable(lazy(() => import('pages/premiere/view/PremiereList')));
const Premiere_create = Loadable(lazy(() => import('pages/premiere/entry/Premiere_create')));
const PremiereDetail = Loadable(lazy(() => import('pages/premiere/view/PremiereDetail')));
const Premiere_update = Loadable(lazy(() => import('pages/premiere/entry/Premiere_update')));

// --- Country Components ---
const CountryList = Loadable(lazy(() => import('pages/country/view/CountryList')));
const Country_create = Loadable(lazy(() => import('pages/country/entry/Country_create')));
const CountryDetail = Loadable(lazy(() => import('pages/country/view/CountryDetail')));
const Country_update = Loadable(lazy(() => import('pages/country/entry/Country_update')));

// --- Rating Components ---
const RatingList = Loadable(lazy(() => import('pages/rating/view/RatingList')));
const Rating_create = Loadable(lazy(() => import('pages/rating/entry/Rating_create')));
const RatingDetail = Loadable(lazy(() => import('pages/rating/view/RatingDetail')));
const Rating_update = Loadable(lazy(() => import('pages/rating/entry/Rating_update')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    { path: '/', element: <DashboardDefault /> },
    {
      path: 'dashboard',
      children: [{ path: 'default', element: <DashboardDefault /> }]
    },
    { path: 'sample-page', element: <SamplePage /> },

    // --- Core Management Routes ---
    {
      path: 'users',
      children: [
        { path: 'list', element: <UsersList /> },
        { path: 'create', element: <Users_create /> },
        { path: 'detail/:id', element: <UsersDetail /> },
        { path: 'update/:id', element: <Users_update /> }
      ]
    },
    {
      path: 'groups',
      children: [
        { path: 'list', element: <GroupsList /> },
        { path: 'create', element: <Groups_create /> },
        { path: 'detail/:id', element: <GroupsDetail /> },
        { path: 'update/:id', element: <Groups_update /> }
      ]
    },
    {
      path: 'notification',
      children: [
        { path: 'list', element: <NotificationList /> },
        { path: 'create', element: <Notification_create /> },
        { path: 'detail/:id', element: <NotificationDetail /> },
        { path: 'update/:id', element: <Notification_update /> }
      ]
    },
    {
      path: 'banner',
      children: [
        { path: 'list', element: <BannerList /> },
        { path: 'create', element: <Banner_create /> },
        { path: 'detail/:id', element: <BannerDetail /> },
        { path: 'update/:id', element: <Banner_update /> }
      ]
    },

    // --- Media Content Management ---
    {
      path: 'movie',
      children: [
        { path: 'list', element: <MovieList /> },
        { path: 'create', element: <Movie_create /> },
        { path: 'detail/:id', element: <MovieDetail /> },
        { path: 'update/:id', element: <Movie_update /> }
      ]
    },
    {
      path: 'movie-video',
      children: [
        { path: 'list', element: <MovieVideoList /> },
        { path: 'create', element: <MovieVideo_create /> },
        { path: 'detail/:id', element: <MovieVideoDetail /> },
        { path: 'update/:id', element: <MovieVideo_update /> }
      ]
    },
    {
      path: 'series',
      children: [
        { path: 'list', element: <SeriesList /> },
        { path: 'create', element: <Series_create /> },
        { path: 'detail/:id', element: <SeriesDetail /> },
        { path: 'update/:id', element: <Series_update /> }
      ]
    },
    {
      path: 'season',
      children: [
        { path: 'list', element: <SeasonList /> },
        { path: 'create', element: <Season_create /> },
        { path: 'detail/:id', element: <SeasonDetail /> },
        { path: 'update/:id', element: <Season_update /> }
      ]
    },
    {
      path: 'episode',
      children: [
        { path: 'list', element: <EpisodeList /> },
        { path: 'create', element: <Episode_create /> },
        { path: 'detail/:id', element: <EpisodeDetail /> },
        { path: 'update/:id', element: <Episode_update /> }
      ]
    },

    // --- Metadata Management ---
    {
      path: 'cast',
      children: [
        { path: 'list', element: <CastList /> },
        { path: 'create', element: <Cast_create /> },
        { path: 'detail/:id', element: <CastDetail /> },
        { path: 'update/:id', element: <Cast_update /> }
      ]
    },
    {
      path: 'genre',
      children: [
        { path: 'list', element: <GenreList /> },
        { path: 'create', element: <Genre_create /> },
        { path: 'detail/:id', element: <GenreDetail /> },
        { path: 'update/:id', element: <Genre_update /> }
      ]
    },
    {
      path: 'director',
      children: [
        { path: 'list', element: <DirectorList /> },
        { path: 'create', element: <Director_create /> },
        { path: 'detail/:id', element: <DirectorDetail /> },
        { path: 'update/:id', element: <Director_update /> }
      ]
    },
    {
      path: 'premiere',
      children: [
        { path: 'list', element: <PremiereList /> },
        { path: 'create', element: <Premiere_create /> },
        { path: 'detail/:id', element: <PremiereDetail /> },
        { path: 'update/:id', element: <Premiere_update /> }
      ]
    },
    {
      path: 'country',
      children: [
        { path: 'list', element: <CountryList /> },
        { path: 'create', element: <Country_create /> },
        { path: 'detail/:id', element: <CountryDetail /> },
        { path: 'update/:id', element: <Country_update /> }
      ]
    },
    {
      path: 'rating',
      children: [
        { path: 'list', element: <RatingList /> },
        { path: 'create', element: <Rating_create /> },
        { path: 'detail/:id', element: <RatingDetail /> },
        { path: 'update/:id', element: <Rating_update /> }
      ]
    }
  ]
};

export default MainRoutes;