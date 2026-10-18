'use client';

import { useNoteStore } from '../../lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNote({
        title: draft.title,
        content: draft.content,
        tag: draft.tag as 'Todo' | 'Work' | 'Personal',
      });

      queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();

      router.push('/notes/filter/all');
    } catch (error) {
      console.error('Помилка при створенні нотатки:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form || ''}>
      <div className={css.fieldGroup || ''}>
        <label htmlFor="title" className={css.label || ''}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft?.title || ''}
          onChange={handleChange}
          className={css.input || ''}
          required
        />
      </div>

      <div className={css.fieldGroup || ''}>
        <label htmlFor="content" className={css.label || ''}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={draft?.content || ''}
          onChange={handleChange}
          className={css.textarea || ''}
          required
        />
      </div>

      <div className={css.fieldGroup || ''}>
        <label htmlFor="tag" className={css.label || ''}>
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={draft?.tag || 'Todo'}
          onChange={handleChange}
          className={css.select || ''}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className={css.actions || ''}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.buttonCancel || css.cancelButton || ''}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.buttonSubmit || css.submitButton || ''}
        >
          Create
        </button>
      </div>
    </form>
  );
}
{
}
