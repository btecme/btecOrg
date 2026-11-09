import { getSecurityFeed } from '@/lib/security-feed';

export const revalidate = 3600;

export async function GET() {
  return Response.json(await getSecurityFeed());
}
