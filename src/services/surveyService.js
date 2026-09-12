import { supabase } from './supabase'

export const submitSurvey = async (surveyData) => {
  const { data, error } = await supabase
    .from('responses')
    .insert([surveyData])
  
  if (error) throw error
  return data
}