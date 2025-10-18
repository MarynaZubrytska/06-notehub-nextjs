import { withDehydratedState } from "@/lib/prefetch";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Params {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Params) {
  const { id } = params;

  const element = await withDehydratedState(
    async (qc) => {
      await qc.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
      });
    },
    <NoteDetailsClient />
  );

  return element;
}
