import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register"
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Home from "./views/Home";
import PersonalHome from "./views/personalHome";
import NewPost from "./views/NewPost";
import PostDetail from "./views/PostDetail";
import DetailsContext from "./context/DetailsContext";
import UserContext from "./context/UserContext";
import Me from "./views/Me";
import MeInstrumentation from "./views/MeInstrumentation";
import MePosts from "./views/MePosts";
import PostEdit from "./views/PostEdit";
import UserPage from "./views/UserPage";
import ProfileContext from "./context/ProfileContext";
import AllPosts from "./views/AllPosts";
import PostsContext from "./context/PostsContext";
import Error from "./views/Error";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>

                <Route element={<ProtectedRoutes/>}>

                    <Route element={<PostsContext/>}>
                        <Route path='/personalHome' element={<PersonalHome/>}/>
                        <Route path='/skyPosts/all' element={<AllPosts/>}/>
                    </Route>


                    <Route path='/publish' element={<NewPost/>}/>

                    <Route element={<DetailsContext/>}>
                        <Route path='/skyPosts/:id' element={<PostDetail/>}/>
                        <Route path='/skyPost/edit/:id' element={<PostEdit/>}/>
                    </Route>

                    <Route element={<UserContext/>}>
                        <Route path='/account' element={<Me/>}/>
                        <Route path='/account/instruments' element={<MeInstrumentation/>}/>
                        <Route path='/account/posts' element={<MePosts/>}/>
                    </Route>

                    <Route element={<ProfileContext/>}>
                        <Route path='/profile/:id' element={<UserPage/>}/>
                    </Route>
                    <Route/>
                    <Route path="*" element={<Error />} />
                </Route>

            </Routes>
        </BrowserRouter>
);
}

export default App;
