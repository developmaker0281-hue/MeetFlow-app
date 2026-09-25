import MeetingClient from "./MeetingClient";

export default async function MeetingPage({
  params,
  searchParams
}: {
  params: Promise<{ room: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { room } = await params;
  const { name } = await searchParams;

  return <MeetingClient room={room} name={name || "Guest"} />;
}
