import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useAuthToken} from '../../../@crema/utility/AppHooks';
import {onValidateHash} from '../../../redux/actions';

const Login2 = () => {
  const {hash} = useParams();
  const [loading, user] = useAuthToken();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onValidateHash(hash));
  }, []);

  useEffect(() => {
    if (!loading && user) {
      window.location.replace('/');
    }
  }, [loading, user]);

  return <div></div>;
};

export default Login2;
