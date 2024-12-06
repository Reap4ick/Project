// import MainLayout from './components/containers/default';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/containers/default';
import HomePage from './components/home';
// import HomePage from './components/home';
// import CategoryCreatePage from './components/categories/create';
// import EditCategoryPage from './components/categories/edit';
// import ProductListPage from './components/products/list';
// import ProductCreatePage from './components/products/create';
// import EditProductPage from './components/products/edit';
// import DetailsProductPage from './components/products/details';
// import Login from './components/auth/login';
// import Register from './components/auth/register';
// import Profile from './components/auth/profile';
// import PostsList from './post/list';
// import PostEditPage from './post/Edit';
//store
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                {/* <Route path="create" element={<CategoryCreatePage />} />
                <Route path="/edit/:id" element={<EditCategoryPage />} /> */}

                {/* Роутинг для продуктів */}
                <Route path={"products"}>
                    {/* <Route index element={<ProductListPage />} />
                    <Route path="create" element={<ProductCreatePage />} />
                    <Route path="edit/:id" element={<EditProductPage />} />
                    <Route path="details/:id" element={<DetailsProductPage />} /> */}
                </Route>

                {/* Роутинг для постів */}
                <Route path="Posts">
                    {/* <Route index element={<PostsList />} />
                    <Route path="edit/:id" element={<PostEditPage />} /> */}
                </Route>
{/* 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />  */}
            </Route>
        </Routes>
    );
}
