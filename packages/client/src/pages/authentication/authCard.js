import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function AuthCard({ children }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default AuthCard;
