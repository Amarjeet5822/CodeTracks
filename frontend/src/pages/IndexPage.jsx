import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGithubData } from "../RTK/features/githubSlice";


function IndexPage() {
  const dispatch = useDispatch();
  const {userDetails: { data :{ } ={}}={}} = useSelector((state) => state.githubData.userDetails);
  useEffect(()=> {
    const fetchUserDetails = async () => {
      try {
        await dispatch(fetchGithubData()).unwrap();
        console.log("(IndexPage) userDetails => ", userDetails)
      } catch (error) {
        console.log("Error fetching user details:", error);        
      }
    };
    fetchUserDetails();
  },[]);
  return (
    <div>
    
    </div>
  )
}

export default IndexPage