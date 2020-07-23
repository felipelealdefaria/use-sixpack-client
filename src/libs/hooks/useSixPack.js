/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SixpackClient from 'sixpack-client';

export default (name, variations, traffic, baseURL) => {
  const [data, setData] = React.useState({
    ready: false,
    variation: null,
    convert: () => {},
  });

  if (typeof window === 'undefined') return data;
  
  const session = new SixpackClient.Session({
    base_url: baseURL || process.env.REACT_APP_SIXPACK_BASE_URL,
    timeout: 4000,
  });

  const force = getForcedVariant(`force-${name}`);

  React.useEffect(() => {
    session.participate(name, variations, traffic, force, (err, res) => {
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

function getForcedVariant(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}