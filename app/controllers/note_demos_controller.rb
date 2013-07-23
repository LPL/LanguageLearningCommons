class NoteDemosController < ApplicationController
	def create
		if current_user.known_languages.first
			note_language = current_user.known_languages.first
		else
			english_learning = Learning.where(user_id: current_user.id, language_id: 3).first
			english_learning.destroy if english_learning
			Knowing.create(user_id: current_user.id, language_id: 3)
			note_language = Language.find(3)
			flash[:notice] = 'For demo purposes, your user now knows English.'
		end

		note = Note.where(language_id: note_language.id).first
		redirect_to user_note_path(note.author, note)
	end
end