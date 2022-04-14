export interface iPreviousPaper {
  id: string;
}

/**
 * Interfaces
 */
 export interface iTestV2
 {
     BasicDetails: iTestMetaV2,
     Sections: iSectionsV2[],
 }

 export interface iTestMetaV2{
     test_seriese_id: string,
     test_seriese_name: string,
     test_seriese_type: string,
     is_MtEt: string,
     category_id: string,
     category_name: string,
     programe_name: string,
     ts_cat_assoc_id: string,
     paper_duration: number,
     max_marks: number,
     audio_file: string,
     audio_time: string,
     totalquest: number
 }

 export interface iSectionsV2 {
     section_id: string,
     section_heading: string,
     section_desc: string,
     section_para: string,
     section_image: string,
     Sets: iSetV2[]
 }

 export interface iSetV2{
     question_sets_id: string,
     Question_count: number,
     display_no_of_questions: number,
     question_sets_heading: string,
     Question_type: Question_Types,
     Question_descp: string,
     Question_passage: string,
     Question_image: string,
     answer_audio_recrod_duration: number,
     behavior_name: Set_Behaviours,
     Questions: iQuestionV2[]
 }

 export interface iQuestionV2{
     question_no: string,
     question_id: string,
     question: string,
     options: iOptionV2[]
 }

 export interface iOptionV2{
     option_key: string,
     option_value: string
 }

 export interface iAnswerv2{
   question_no: string,
   question_id: string,
   question_sets_id: string,
   section_id: string,

   student_answers?: string,
   active?: boolean,
   is_img?: boolean,

   answer_audio_recrod_duration?: number,
   recordingStatus?: 'start' | 'stop' | 'recording'
 }

 export interface iInstructionv1{
   content: string;
   category_name: string;
 }

 export interface iCurentQuestiov1 {
   CurrentModule?: string ,
   CurrentSectionId?: string,
   CurrentSetId?: string,
 }

 export interface iTestQueryV1 {
   TestId: string,
   CategoryAssocId: string,
   CategoryId: string
 };

 export type Question_Types = "Table completion" | "null" | string;
 export type Set_Behaviours = "text" | "Radio" | "null";

 export interface iTestResultV1{
   success: number,
   message: string,
   totalQuestion: number,
   skipped: number,
   attempted: number,
   time_taken: string,
   Total: string,
   band_score: string,
   pro_level: string,
   percentage: string,
   result_id: string,
   basic: {
       test_seriese_name: string,
       test_seriese_type: string,
       category_name: string,
       programe_name: string,
       paper_duration: string,
       max_marks: string,
       audio_file: string,
       audio_time: string,
       totalquest: string
   },
   QA: {
     section_heading: string,
     question_sets_heading: string,
     question_sets_para: string,
     question_no: string,
     question: string,
     student_answers: string,
     correct_answer: string,
     correct_answer_explaination: string,
     marks_secured: string
   }[]
 };

 export interface iTestListItemV1 {
   already_given: boolean
   instructions_page: number
   locked: boolean
   package_id: string
   retake_eligible: boolean
   retake_limit: number
   star_count: string,
   test_seriese_id: string,
   test_seriese_name: string,
   test_seriese_type: "FREE" | "PAID",
   attempts?: {
      Listening: number,
      Reading: number,
      Writing: number,
      Speaking: number
    },
 };

 export interface iTestListCatItemV1{
  ts_cat_assoc_id: string,
  category_id: string,
  category_name: string,
  icon: string,
  totalQuest: string,
  paperDuration: string
}

 export interface iSpeakingSlotV1 {
   avail_id: string
   end_time: string
   start_time: string
   user_id: string
 }

 export interface iSpeakingSlotsOnDayV1 {
   date: string,
   slots: iSpeakingSlotV1[]
 }


