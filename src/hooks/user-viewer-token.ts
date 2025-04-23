import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { createViewerToken } from '@/actions/token';

import { JwtPayload, jwtDecode } from 'jwt-decode';

export const useViewerToken = (hostUsername: string) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostUsername);
        setToken(viewerToken);

        const decodedToken = jwtDecode<JwtPayload & {name?:string}>(viewerToken)

        const name = decodedToken?.name;
        const identity = decodedToken.sub;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error('Something went wrong!');
      }
    };
    createToken();
  }, [hostUsername]);

  return {
    token,
    name,
    identity,
  };
};
