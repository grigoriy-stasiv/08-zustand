import axios from 'axios';
import type { Note, CreateNoteInput } from '@/types/note';
import type { FetchNotesResponse } from '@/types/api';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
});

instance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  
  const apiTagMap: Record<string, string> = {
    work: 'Work',
    personal: 'Personal',
    meeting: 'Meeting',
    todo: 'Todo',
    shopping: 'Shopping',
  };

  const normalizedTag = tag && tag.toLowerCase() !== 'all' 
    ? (apiTagMap[tag.toLowerCase()] || tag) 
    : undefined;

  const params: Record<string, string | number | undefined> = {
    page,
    perPage,
    search: search.trim() !== '' ? search.trim() : undefined,
    tag: normalizedTag,
  };

  const { data } = await instance.get<FetchNotesResponse>('/', {
    params,
  });

  return data;
};




export const createNote = async (note: CreateNoteInput): Promise<Note> => {
  const { data } = await instance.post<Note>('/', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/${id}`); 
  return data;
};
