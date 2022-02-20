import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Category from '../components/admin/category/Category';
import Category from '../components/admin/category/ViewCategory';

import Category from '../components/admin/category/EditCategory';

const routes =[
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: '/admin/edit-category', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory }

];

export default routes;