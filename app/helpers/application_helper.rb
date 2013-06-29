module ApplicationHelper

	CONSONANTS = ["b", "c", "d", "f", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "z"]
	VOWELS = ["a", "e", "i", "o", "u"]

	def demo_user_name
		user_names = User.all.map{ |user| user.name}
		original_name, inoffensive_name = false

		until original_name && inoffensive_name
			name = CONSONANTS.sample.upcase + VOWELS.sample + CONSONANTS.sample
			original_name = !user_names.include?(name)
			inoffensive_name = !["Nig", "Fag"].include?(name)
		end

		name
	end
end
