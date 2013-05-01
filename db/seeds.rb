mandarin = Language.create!(name: "Mandarin")
spanish = Language.create!(name: "Spanish")
english = Language.create!(name: "English")
hindi = Language.create!(name: "Hindi")
arabic = Language.create!(name: "Arabic")
portuguese = Language.create!(name: "Portuguese")
bengali = Language.create!(name: "Bengali")
russian = Language.create!(name: "Russian")
japanese = Language.create!(name: "Japanese")
punjabi = Language.create!(name: "Punjabi")
german = Language.create!(name: "German")

wen = User.create!(name: "Wen", email: "w@e.n", password: "12121212")
kim = User.create!(name: "Kim", email: "k@i.m", password: "12121212")
lal = User.create!(name: "Lal", email: "l@a.l", password: "12121212")
cid = User.create!(name: "Cid", email: "c@i.d", password: "12121212")


# debugger
# kim.bebuddy(wen)
# wen.bebuddy(lal)
# lal.bebuddy(cid)
# cid.bebuddy(kim)

Knowing.create!(language: english, user: kim)
Learning.create!(language: mandarin, user: kim)
Learning.create!(language: spanish, user: kim)
Learning.create!(language: hindi, user: kim)

Knowing.create!(language: hindi, user: lal)
Knowing.create!(language: bengali, user: lal)
Knowing.create!(language: english, user: lal)
Learning.create!(language: arabic, user: lal)

Knowing.create!(language: spanish, user: cid)
Knowing.create!(language: portuguese, user: cid)
Learning.create!(language: hindi, user: cid)
Learning.create!(language: mandarin, user: cid)

Knowing.create!(language: mandarin, user: wen)
Knowing.create!(language: arabic, user: wen)
Learning.create!(language: portuguese, user: wen)
Learning.create!(language: bengali, user: wen)

Note.create!(author: wen, language: english, title: "Ainulindale", body: "Desiring to create things of his own and knowing of but not understanding the Flame Imperishable, Melkor often went forth into the Great Void outside of the Timeless Halls in search of this flame. His quest was in vain; he found not the Flame Imperishable for it lies with Eru alone. Melkor grew ever more impatient of the unclear designs of Eru and the emptiness of the Void, and was often alone and apart from his fellow Ainur. It was during these lonesome periods that Melkor began to have ideas and thoughts of his own that were not in accordance with his fellow Ainur.")
Note.create!(author: kim, language: mandarin, title: "Before the Two Trees", body: "When the Valar entered into Arda and began to shape the unwrought matter, Melkor saw the Field of Arda and claimed it for his own, striving against the Valar. He took shape in tremendous majesty like a burning mountain of ice with piercing eyes that withered, and when they raised mountains Melkor cast them down, and when they delved valleys Melkor raised them up; yet still the Earth was fashioned slowly and made firm. For a long while, Melkor fought alone against the might of all the other Valar and Maiar of Arda, and he long held the upper hand. Then Tulkas came, his strength tipping the balance in favor of the Valar, and from his laughter Melkor fled, hating Tulkas ever after.")
Note.create!(author: kim, language: english, title: "Before the Sun and Moon", body: "When it was discovered by the Vala Orome where the elves were, the Valar took immediate action against Melkor. This action was called the War of the Powers, during which Melkor's armies were destroyed piecemeal, while he directed operations from afar, for already he was grown weaker; though he knew it not. When he saw the Valar winning, in haste he retreated into Utumno and shut the great doors in the Valar's face. Then they smote them open and fought their way down, until at last they stood in the bottommost chamber where Melkor waited, and both Manwe and Melkor were astounded. For Manwe had expected to find Melkor too powerful to overcome, and now he perceived Melkor, having put power into his slaves, was weaker. Melkor also perceiving this was dismayed. Then Tulkas and Aule fought him, and Tulkas smote Melkor in the teeth, and Melkor leaped upon Manwe with a great flail, but Manwe gently blew on it and bent the thongs aside. Then Tulkas cast Melkor down, and straight away Aule wrapped him thirty times in the Chain Angainor. He was cast into Mandos for three Ages of the world, ere his cause could be tried or he sue for pardon; for the Valar did not comprehend yet the true depth of his fall.")
Note.create!(author: kim, language: english, title: "First Age of the Sun", body: "Feanor followed Morgoth to Middle-earth with the greater part of the Noldor in rebellion, hoping to recover the Silmarils, thus began The War of the Great Jewels. Morgoth sent hosts of Orcs to destroy Feanor's host. To his dismay only a handful returned. But though he was not aware of it until later, Feanor his hated enemy had also fallen. As he lay dying Feanor cursed him thrice. Morgoth sent an embassy offering terms of surrender, even promising a Silmaril. Maedhros came to the parley, but both sides came with greater force than was agreed. Morgoth's force was greater, and he captured Maedhros and chained him by the right hand to a cliff of Thangorodrim.")
Note.create!(author: kim, language: english, title: "The Cursing of Hurin", body: "Morgoth was also well known for the imprisonment of Hurin of the House of Hador during the Nirnaeth Arnoediad (Battle of Unnumbered Tears). In the last hours of the battle Hurin and his kin defended Turgon, for he was the last heir to the throne of Gondolin and of Fingolfin after his brother, Fingon, fell in battle. Turgon narrowly escaped the clutches of the host of orcs due to the valor of Hurin and Huor and their men. Unfortunately, all but Hurin fell after the onslaught of Morgoth's forces. After slaying 70 trolls, Hurin was bound by Gothmog with his flaming whip and, thus, sent him to Angband. There, after a nightmare of chained torment in Thangorodrim's chambers, Hurin still defied Morgoth and refused to tell him where Gondolin lay.")

