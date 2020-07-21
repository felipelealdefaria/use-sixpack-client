/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SixpackClient from 'sixpack-client';

export default (name, variations, traffic, baseURL) => {
  const session = new SixpackClient.Session({
    base_url: baseURL || process.env.REACT_APP_SIXPACK_BASE_URL,
    timeout: 4000,
  });

  const [data, setData] = React.useState({
    ready: false,
    variation: null,
    convert: () => {},
  });

  React.useEffect(() => {
    session.participate(name, variations, traffic, (err, res) => {
      if (!err) {
        const convert = (kpi) =>
          new Promise((resolve, reject) => {
            session.convert(name, kpi, function (err) {
              if (err) {
                console.error(err);
                return reject();
              }
              return resolve();
            });
          });
        setData({
          ready: true,
          variation: res.alternative.name,
          convert,
        });
      } else {
        console.error('err', err)
      }
    });
  }, []);

  return data;
};