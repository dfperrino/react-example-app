import { Button } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import './nomatch.css';

const NoMatch: FC<any> = () => {
  const navigate = useNavigate();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>
            <FormattedMessage id="app.nomatch.message" />
          </h2>
        </div>
        <Button variant="contained" onClick={() => navigate('/')}>
          <FormattedMessage id="app.nomatch.go" />
        </Button>
      </div>
    </div>
  );
};

export default NoMatch;
