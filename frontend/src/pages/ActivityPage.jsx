import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ActivityPage() {
  const { isAuthenticated } = useSelector((state) => state.authUser);
    const navigate = useNavigate();
  
  
  return (
    <div>ActivityPage</div>
  )
}

export default ActivityPage;