'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { updateNameAction, UpdateNameState } from './actions';
import { toast } from 'react-toastify';

const initialState: UpdateNameState = { success: false };

export function EditableName({ name }: { name: string }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(updateNameAction, initialState);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (state.success) {
      setEditing(false);
      toast.success('Name updated');
    }
  }, [state]);

  if (!editing) {
    return (
      <div className="flex items-center gap-2 group">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" data-testid="user-name">{name}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
          aria-label="Edit name"
          data-testid="edit-name-btn"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input
        ref={inputRef}
        name="name"
        defaultValue={name}
        data-testid="edit-name-input"
        className="text-2xl sm:text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-emerald-400 outline-none py-0.5 w-full max-w-xs"
        onKeyDown={(e) => {
          if (e.key === 'Escape') setEditing(false);
        }}
      />
      <button
        type="submit"
        disabled={isPending}
        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50"
        aria-label="Save"
        data-testid="edit-name-save"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Cancel"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {state.error && <p className="text-xs text-red-500 ml-1">{state.error}</p>}
    </form>
  );
}
