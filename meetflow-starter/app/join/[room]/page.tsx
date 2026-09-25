import JoinClient from "./JoinClient";

export default async function JoinPage({
  params
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  return <JoinClient room={room} />;
}
