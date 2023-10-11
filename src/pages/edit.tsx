'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';

import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import AddMusicHighlight from '@/components/post/AddMusicHighlight';
import EditingHighlight from '@/components/post/EditingHighlight';
import { getHighlightDetailApi } from '@/hooks/highlight/api';

function EditHighlight() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(true);
  const [editingHighlight, setHighlight] = useAtom(uploadAtom.editingHighlight);
  const setSong = useSetAtom(authAtom.selectedPickSong);

  const setEditingHighlight = async (highlightId: number) => {
    try {
      setLoading(true);
      const result = await getHighlightDetailApi(highlightId);
      setHighlight(result);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (query.highlightId) {
      setEditingHighlight(Number(query.highlightId));
    }
  }, [query]);

  useEffect(() => {
    if (!editingHighlight) return;
    setSong((prev) => {
      const newSong = editingHighlight?.highlightSong.map((x) => {
        return {
          ...x.song!,
          id: x.id,
        };
      });
      return newSong;
    });
  }, [editingHighlight]);

  if (loading) {
    return (
      <section className="deviceHeight flex w-screen items-center justify-center">
        <Spinner />
      </section>
    );
  }

  const renderStep = () => {
    switch (router.query.step) {
      case 'music':
        return <AddMusicHighlight />;

      default:
        return <EditingHighlight />;
    }
  };

  return <div>{renderStep()}</div>;
}

export default EditHighlight;
