import { ConnectModal } from './_components/connect-modal';
import { UrlCard } from './_components/url-card';
import { KeyCard } from './_components/key-card';

import { getStream } from '@/lib/stream-service';

const KeysPage = async () => {
  const stream = await getStream();

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.server_url} />
        <KeyCard value={stream.stream_key} />
      </div>
    </div>
  );
};

export default KeysPage;
