export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      article_marks: {
        Row: {
          articleId: number
          created_at: string
          end: number
          id: number
          line: number
          start: number
        }
        Insert: {
          articleId: number
          created_at?: string
          end: number
          id?: number
          line: number
          start: number
        }
        Update: {
          articleId?: number
          created_at?: string
          end?: number
          id?: number
          line?: number
          start?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_marks_articleid_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "article_marks_articleid_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_marks_articleid_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quiz_answer_rows: {
        Row: {
          answerId: number
          created_at: string
          id: number
          line: number
          pitchStr: string
        }
        Insert: {
          answerId: number
          created_at?: string
          id?: number
          line: number
          pitchStr: string
        }
        Update: {
          answerId?: number
          created_at?: string
          id?: number
          line?: number
          pitchStr?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_quiz_answer_rows_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_rows_view"
            referencedColumns: ["answerId"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answer_rows_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answer_rows_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answers"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quiz_answers: {
        Row: {
          created_at: string
          id: number
          quizId: number
        }
        Insert: {
          created_at?: string
          id?: number
          quizId: number
        }
        Update: {
          created_at?: string
          id?: number
          quizId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["quizId"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quiz_questions: {
        Row: {
          created_at: string
          id: number
          line: number
          lockedIndexes: number[]
          quizId: number
        }
        Insert: {
          created_at?: string
          id?: number
          line: number
          lockedIndexes: number[]
          quizId: number
        }
        Update: {
          created_at?: string
          id?: number
          line?: number
          lockedIndexes?: number[]
          quizId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["quizId"]
          },
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quizzes: {
        Row: {
          articleId: number
          created_at: string
          hasAudio: boolean
          id: number
          isDev: boolean
          title: string
        }
        Insert: {
          articleId: number
          created_at?: string
          hasAudio?: boolean
          id?: number
          isDev?: boolean
          title: string
        }
        Update: {
          articleId?: number
          created_at?: string
          hasAudio?: boolean
          id?: number
          isDev?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_recorded_assignments: {
        Row: {
          articleId: number
          audioPath: string
          created_at: string
          id: number
          line: number
        }
        Insert: {
          articleId: number
          audioPath: string
          created_at?: string
          id?: number
          line: number
        }
        Update: {
          articleId?: number
          audioPath?: string
          created_at?: string
          id?: number
          line?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_article_recorded_assinments_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_article_recorded_assinments_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_recorded_assinments_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          audioPath: string
          created_at: string
          date: string
          id: number
          isArchived: boolean
          isShowAccents: boolean
          title: string
          uid: string
        }
        Insert: {
          audioPath: string
          created_at?: string
          date: string
          id?: number
          isArchived?: boolean
          isShowAccents?: boolean
          title: string
          uid: string
        }
        Update: {
          audioPath?: string
          created_at?: string
          date?: string
          id?: number
          isArchived?: boolean
          isShowAccents?: boolean
          title?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      betterread: {
        Row: {
          articleId: number
          created_at: string
          id: number
          uid: string
        }
        Insert: {
          articleId: number
          created_at?: string
          id?: number
          uid: string
        }
        Update: {
          articleId?: number
          created_at?: string
          id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      betterread_item_questions: {
        Row: {
          betterread_item_id: number
          created_at: string
          id: number
          question: string
          view_point: string
        }
        Insert: {
          betterread_item_id: number
          created_at?: string
          id?: number
          question: string
          view_point?: string
        }
        Update: {
          betterread_item_id?: number
          created_at?: string
          id?: number
          question?: string
          view_point?: string
        }
        Relationships: [
          {
            foreignKeyName: "betterread_item_questions_betterread_item_id_fkey"
            columns: ["betterread_item_id"]
            isOneToOne: false
            referencedRelation: "betterread_items"
            referencedColumns: ["id"]
          },
        ]
      }
      betterread_items: {
        Row: {
          betterread_id: number
          created_at: string
          id: number
          image_url: string
        }
        Insert: {
          betterread_id: number
          created_at?: string
          id?: number
          image_url: string
        }
        Update: {
          betterread_id?: number
          created_at?: string
          id?: number
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "betterread_items_betterread_id_fkey"
            columns: ["betterread_id"]
            isOneToOne: false
            referencedRelation: "betterread"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_items_betterread_id_fkey"
            columns: ["betterread_id"]
            isOneToOne: false
            referencedRelation: "betterread_view"
            referencedColumns: ["id"]
          },
        ]
      }
      betterread_toggle: {
        Row: {
          id: number
          show: boolean
        }
        Insert: {
          id?: number
          show?: boolean
        }
        Update: {
          id?: number
          show?: boolean
        }
        Relationships: []
      }
      canvas_boxes: {
        Row: {
          highlights: number[]
          id: number
          isHidden: boolean
          label: string
          splitBy: number
          x: number
          y: number
        }
        Insert: {
          highlights: number[]
          id?: number
          isHidden: boolean
          label: string
          splitBy: number
          x: number
          y: number
        }
        Update: {
          highlights?: number[]
          id?: number
          isHidden?: boolean
          label?: string
          splitBy?: number
          x?: number
          y?: number
        }
        Relationships: []
      }
      canvas_field: {
        Row: {
          connectedObjSets: string[]
          expandObjId: number | null
          expandStartObjId: number | null
          id: number
        }
        Insert: {
          connectedObjSets?: string[]
          expandObjId?: number | null
          expandStartObjId?: number | null
          id?: number
        }
        Update: {
          connectedObjSets?: string[]
          expandObjId?: number | null
          expandStartObjId?: number | null
          id?: number
        }
        Relationships: []
      }
      homepage_infos: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          text: string
          uid: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_url?: string | null
          text?: string
          uid: string
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string | null
          text?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "homepage_infos_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mirror_workout_realtime: {
        Row: {
          id: number
          isMirror: boolean
          selectedId: string
        }
        Insert: {
          id?: number
          isMirror?: boolean
          selectedId: string
        }
        Update: {
          id?: number
          isMirror?: boolean
          selectedId?: string
        }
        Relationships: []
      }
      mirror_workout_results: {
        Row: {
          correctRatio: number
          created_at: string
          id: number
          items: string
          laps: number[]
          selectedNumbers: number[]
          totalTime: number
          uid: string
        }
        Insert: {
          correctRatio: number
          created_at?: string
          id?: number
          items: string
          laps: number[]
          selectedNumbers: number[]
          totalTime: number
          uid: string
        }
        Update: {
          correctRatio?: number
          created_at?: string
          id?: number
          items?: string
          laps?: number[]
          selectedNumbers?: number[]
          totalTime?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "mirror_workout_results_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      note: {
        Row: {
          id: number
          text: string
        }
        Insert: {
          id?: number
          text: string
        }
        Update: {
          id?: number
          text?: string
        }
        Relationships: []
      }
      note_audio_paths: {
        Row: {
          audioPath: string
          id: number
          index: number
        }
        Insert: {
          audioPath: string
          id?: number
          index: number
        }
        Update: {
          audioPath?: string
          id?: number
          index?: number
        }
        Relationships: []
      }
      page_states: {
        Row: {
          pageState: string
          uid: string
        }
        Insert: {
          pageState: string
          uid: string
        }
        Update: {
          pageState?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_states_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_cup_params: {
        Row: {
          created_at: string
          cue: string
          id: number
          params: string
        }
        Insert: {
          created_at?: string
          cue?: string
          id?: number
          params?: string
        }
        Update: {
          created_at?: string
          cue?: string
          id?: number
          params?: string
        }
        Relationships: []
      }
      pitches: {
        Row: {
          id: number
          japanese: string
          pitchStr: string
        }
        Insert: {
          id?: number
          japanese: string
          pitchStr: string
        }
        Update: {
          id?: number
          japanese?: string
          pitchStr?: string
        }
        Relationships: []
      }
      pitches_user: {
        Row: {
          id: number
          pitchStr: string
        }
        Insert: {
          id?: number
          pitchStr: string
        }
        Update: {
          id?: number
          pitchStr?: string
        }
        Relationships: []
      }
      postit_items: {
        Row: {
          id: number
          image_url: string | null
          index: number
          japanese: string
          postit_id: number
        }
        Insert: {
          id?: number
          image_url?: string | null
          index: number
          japanese: string
          postit_id: number
        }
        Update: {
          id?: number
          image_url?: string | null
          index?: number
          japanese?: string
          postit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "postit_items_postit_id_fkey"
            columns: ["postit_id"]
            isOneToOne: false
            referencedRelation: "postits"
            referencedColumns: ["id"]
          },
        ]
      }
      postit_note_items: {
        Row: {
          created_at: string
          id: number
          image_url: string
          postit_note_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          image_url: string
          postit_note_id: number
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string
          postit_note_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "postit_note_items_postit_note_id_fkey"
            columns: ["postit_note_id"]
            isOneToOne: false
            referencedRelation: "postit_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      postit_notes: {
        Row: {
          id: number
          uid: string
        }
        Insert: {
          id?: number
          uid: string
        }
        Update: {
          id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "postit_notes_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      postits: {
        Row: {
          id: number
          uid: string
        }
        Insert: {
          id?: number
          uid: string
        }
        Update: {
          id?: number
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "postits_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      record_params: {
        Row: {
          created_at: string
          id: number
          pitchStr: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          pitchStr: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          pitchStr?: string
          title?: string
        }
        Relationships: []
      }
      records: {
        Row: {
          created_at: string
          id: number
          path: string
          pitchStr: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          path: string
          pitchStr: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          path?: string
          pitchStr?: string
          title?: string
        }
        Relationships: []
      }
      redirect_tos: {
        Row: {
          id: number
          redirect_to: string
          uid: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          redirect_to: string
          uid?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          redirect_to?: string
          uid?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "redirect_tos_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sentences: {
        Row: {
          articleId: number
          chinese: string
          created_at: string
          id: number
          japanese: string
          line: number
          original: string
          pitchStr: string
        }
        Insert: {
          articleId: number
          chinese: string
          created_at?: string
          id?: number
          japanese: string
          line: number
          original: string
          pitchStr: string
        }
        Update: {
          articleId?: number
          chinese?: string
          created_at?: string
          id?: number
          japanese?: string
          line?: number
          original?: string
          pitchStr?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      speed_workout: {
        Row: {
          id: number
          isOpen: boolean
          isRunning: boolean
          selectedId: number | null
          selectedItemId: number | null
        }
        Insert: {
          id?: number
          isOpen?: boolean
          isRunning?: boolean
          selectedId?: number | null
          selectedItemId?: number | null
        }
        Update: {
          id?: number
          isOpen?: boolean
          isRunning?: boolean
          selectedId?: number | null
          selectedItemId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "speed_workout_selectedid_fkey"
            columns: ["selectedId"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speed_workout_selectedid_fkey"
            columns: ["selectedId"]
            isOneToOne: false
            referencedRelation: "workouts_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speed_workout_selectedItemId_fkey"
            columns: ["selectedItemId"]
            isOneToOne: false
            referencedRelation: "workout_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speed_workout_selectedItemId_fkey"
            columns: ["selectedItemId"]
            isOneToOne: false
            referencedRelation: "workout_items_view"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display: string
          uid: string
        }
        Insert: {
          created_at?: string
          display: string
          uid: string
        }
        Update: {
          created_at?: string
          display?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_items: {
        Row: {
          chinese: string
          created_at: string
          id: number
          index: number
          japanese: string
          pitchStr: string
          workoutId: number
        }
        Insert: {
          chinese: string
          created_at?: string
          id?: number
          index: number
          japanese: string
          pitchStr: string
          workoutId: number
        }
        Update: {
          chinese?: string
          created_at?: string
          id?: number
          index?: number
          japanese?: string
          pitchStr?: string
          workoutId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts_view"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_record_rows: {
        Row: {
          created_at: string
          id: number
          index: number
          workoutItemId: number
          workoutRecordId: number
        }
        Insert: {
          created_at?: string
          id?: number
          index: number
          workoutItemId: number
          workoutRecordId: number
        }
        Update: {
          created_at?: string
          id?: number
          index?: number
          workoutItemId?: number
          workoutRecordId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_record_rows_workoutItemId_fkey"
            columns: ["workoutItemId"]
            isOneToOne: false
            referencedRelation: "workout_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_record_rows_workoutItemId_fkey"
            columns: ["workoutItemId"]
            isOneToOne: false
            referencedRelation: "workout_items_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_record_rows_workoutRecordId_fkey"
            columns: ["workoutRecordId"]
            isOneToOne: false
            referencedRelation: "workout_records"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_records: {
        Row: {
          audioPath: string
          bpm: number
          created_at: string
          id: number
          workoutId: number
        }
        Insert: {
          audioPath: string
          bpm: number
          created_at?: string
          id?: number
          workoutId: number
        }
        Update: {
          audioPath?: string
          bpm?: number
          created_at?: string
          id?: number
          workoutId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_records_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_records_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts_view"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string
          id: number
          isDev: boolean
          isReview: boolean
          targetBPM: number
          title: string
          uid: string
        }
        Insert: {
          created_at?: string
          id?: number
          isDev?: boolean
          isReview?: boolean
          targetBPM: number
          title: string
          uid?: string
        }
        Update: {
          created_at?: string
          id?: number
          isDev?: boolean
          isReview?: boolean
          targetBPM?: number
          title?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_workouts_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      article_pitch_quiz_answer_rows_view: {
        Row: {
          answer: string | null
          answerId: number | null
          audioPath: string | null
          created_at: string | null
          end: number | null
          hasAudio: boolean | null
          id: number | null
          line: number | null
          lockedIndexes: number[] | null
          pitchStr: string | null
          quizId: number | null
          start: number | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["quizId"]
          },
          {
            foreignKeyName: "public_article_pitch_quiz_answers_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quiz_answer_view: {
        Row: {
          articleId: number | null
          audioPath: string | null
          created_at: string | null
          display: string | null
          hasAudio: boolean | null
          id: number | null
          quizId: number | null
          title: string | null
        }
        Relationships: []
      }
      article_pitch_quiz_questions_view: {
        Row: {
          articleId: number | null
          audioPath: string | null
          end: number | null
          hasAudio: boolean | null
          id: number | null
          isDev: boolean | null
          japanese: string | null
          line: number | null
          lockedIndexes: number[] | null
          pitchStr: string | null
          quizId: number | null
          start: number | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["quizId"]
          },
          {
            foreignKeyName: "public_article_pitch_questions_articlePitchQuizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quizzes_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      article_pitch_quizzes_view: {
        Row: {
          articleId: number | null
          audioPath: string | null
          created_at: string | null
          display: string | null
          hasAudio: boolean | null
          id: number | null
          isDev: boolean | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_article_pitch_quizzes_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_view: {
        Row: {
          audioPath: string | null
          created_at: string | null
          date: string | null
          display: string | null
          id: number | null
          isArchived: boolean | null
          isShowAccents: boolean | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      betterread_view: {
        Row: {
          articleId: number | null
          chinese: string | null
          display: string | null
          id: number | null
          japanese: string | null
          line: number | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "betterread_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      page_states_view: {
        Row: {
          display: string | null
          pageState: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_states_uid_fkey"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      redirect_tos_view: {
        Row: {
          display: string | null
          id: number | null
          redirect_to: string | null
          uid: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redirect_tos_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sentences_view: {
        Row: {
          articleId: number | null
          articleRecordedAssignmentId: number | null
          audioPath: string | null
          chinese: string | null
          created_at: string | null
          date: string | null
          end: number | null
          id: number | null
          isArchived: boolean | null
          isShowAccents: boolean | null
          japanese: string | null
          line: number | null
          original: string | null
          pitchStr: string | null
          recorded_audioPath: string | null
          start: number | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "article_pitch_quiz_answer_view"
            referencedColumns: ["articleId"]
          },
          {
            foreignKeyName: "public_sentences_articleId_fkey"
            columns: ["articleId"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_items_view: {
        Row: {
          chinese: string | null
          created_at: string | null
          display: string | null
          id: number | null
          index: number | null
          isReview: boolean | null
          japanese: string | null
          pitchStr: string | null
          targetBPM: number | null
          title: string | null
          uid: string | null
          workoutId: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workouts_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_record_rows_view: {
        Row: {
          audioPath: string | null
          bpm: number | null
          chinese: string | null
          created_at: string | null
          display: string | null
          id: number | null
          index: number | null
          isDev: boolean | null
          isReview: boolean | null
          japanese: string | null
          pitchStr: string | null
          targetBPM: number | null
          title: string | null
          uid: string | null
          workoutId: number | null
          workoutItemId: number | null
          workoutRecordId: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_items_workoutId_fkey"
            columns: ["workoutId"]
            isOneToOne: false
            referencedRelation: "workouts_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_record_rows_workoutItemId_fkey"
            columns: ["workoutItemId"]
            isOneToOne: false
            referencedRelation: "workout_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_record_rows_workoutItemId_fkey"
            columns: ["workoutItemId"]
            isOneToOne: false
            referencedRelation: "workout_items_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_record_rows_workoutRecordId_fkey"
            columns: ["workoutRecordId"]
            isOneToOne: false
            referencedRelation: "workout_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workouts_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts_view: {
        Row: {
          created_at: string | null
          display: string | null
          id: number | null
          isDev: boolean | null
          isReview: boolean | null
          targetBPM: number | null
          title: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_workouts_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
