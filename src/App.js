/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import moment from 'moment';
import './styles/App.css';
import './styles/scss/main.scss';
import './common/helpers/main';
import 'react-tooltip/dist/react-tooltip.css';
import 'font-awesome/css/font-awesome.min.css';

import { clearLocalStorage, getAuthData } from './common/helpers/utils';
import ProtectedRoute from './common/helpers/ProtectedRoute';

const TestFlow = React.lazy(() => import('./features/TestFlow/TestFlow'));

function App() {
  const queryClient = new QueryClient();
  const [isSignedOut, setIsSignedOut] = useState(true);
  const [idleSessionTimeout, setIdleSessionTimeout] = useState();
  const [lasteActiveAT, setLasteActiveAt] = useState();
  const [currentTime, setCurrentTime] = useState();

  const timerFunction = () => {
    setInterval(() => {
      setCurrentTime(moment().format('HH:mm:ss'));
    }, 1000);
  };

  const timeInterval = async (lastActiveAt) => {
    const format = 'HH:mm:ss';
    const endTime = moment(lastActiveAt, format).add(idleSessionTimeout, 'minutes');
    const endMoment = endTime?.format('HH:mm:ss');
    const condition = moment(endMoment, format).isBefore(moment(currentTime, format));
    if (condition && isSignedOut === false && idleSessionTimeout) {
      await clearLocalStorage().then(() => {
        window.location.reload();
        setIsSignedOut(true);
      });
    }
    if (isSignedOut === false && idleSessionTimeout) {
    }
    return null;
  };

  const resetIdleTimer = () => {
    setLasteActiveAt(moment().format('HH:mm:ss'));
  };

  useEffect(() => {
    setIsSignedOut(false);
    timerFunction();
    setIdleSessionTimeout(getAuthData()?.idle_session_timeout_minutes);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
    };
  }, []);

  useEffect(() => {
    if (lasteActiveAT) {
      timeInterval(lasteActiveAT);
    }
  }, [lasteActiveAT, currentTime]);

  return (
    <Suspense>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/comm-voice-admin">
              <Route path="call-flow/:id" element={<ProtectedRoute element={TestFlow} />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </div>
    </Suspense>
  );
}

export default App;
