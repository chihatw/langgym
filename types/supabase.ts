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
      betterread_image_paths: {
        Row: {
          betterreadId: number
          created_at: string
          id: number
          imagePath: string
          index: number
        }
        Insert: {
          betterreadId: number
          created_at?: string
          id?: number
          imagePath: string
          index: number
        }
        Update: {
          betterreadId?: number
          created_at?: string
          id?: number
          imagePath?: string
          index?: number
        }
        Relationships: [
          {
            foreignKeyName: "betterread_image_paths_betterreadid_fkey"
            columns: ["betterreadId"]
            isOneToOne: false
            referencedRelation: "betterread"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "betterread_image_paths_betterreadid_fkey"
            columns: ["betterreadId"]
            isOneToOne: false
            referencedRelation: "betterread_image_paths_view"
            referencedColumns: ["betterreadId"]
          },
        ]
      }
      canvas: {
        Row: {
          color: string
          id: number
          label: string
          x: number
          y: number
        }
        Insert: {
          color?: string
          id?: number
          label?: string
          x?: number
          y?: number
        }
        Update: {
          color?: string
          id?: number
          label?: string
          x?: number
          y?: number
        }
        Relationships: []
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
          isOpen: boolean
          pageState: string
          uid: string
        }
        Insert: {
          isOpen?: boolean
          pageState: string
          uid: string
        }
        Update: {
          isOpen?: boolean
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
      pathname_logs: {
        Row: {
          created_at: string
          id: number
          pathname: string
          removed_at: string | null
          uid: string
        }
        Insert: {
          created_at?: string
          id?: number
          pathname: string
          removed_at?: string | null
          uid: string
        }
        Update: {
          created_at?: string
          id?: number
          pathname?: string
          removed_at?: string | null
          uid?: string
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
      remote_login_trigger: {
        Row: {
          id: number
          updated_at: string
        }
        Insert: {
          id?: number
          updated_at: string
        }
        Update: {
          id?: number
          updated_at?: string
        }
        Relationships: []
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
      todos: {
        Row: {
          completed: boolean | null
          created_at: string
          created_by: string | null
          id: number
          title: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
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
          created_at: string | null
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
      betterread_image_paths_view: {
        Row: {
          articleId: number | null
          betterreadId: number | null
          chinese: string | null
          created_at: string | null
          imagePath: string | null
          index: number | null
          japanese: string | null
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
          isOpen: boolean | null
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
      pathname_logs_view: {
        Row: {
          created_at: string | null
          display: string | null
          pathname: string | null
          removed_at: string | null
          uid: string | null
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
      update_pathname_log: {
        Args: {
          _uid: string
          _pathname: string
        }
        Returns: undefined
      }
      update_remote_login_trigger: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
