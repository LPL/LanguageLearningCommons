class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable#, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me

	has_many :knowings
	has_many :known_languages, :through => :knowings, :source => :language

	has_many :learnings
	has_many :learning_languages, :through => :learnings, :source => :language

  has_many :buddied_roles, :class_name => 'Buddyship'#, :foreign_key => :user_id
  has_many :buddies, :through => :buddied_roles#, :source => :buddy

  has_many :buddy_roles, :class_name => 'Buddyship', :foreign_key => 'buddy_id'

  has_many :notes, :foreign_key => :author_id
  has_many :revisions, :foreign_key => :revisor_id
  has_many :note_revisions, :through :notes, :source => :revisions

  validates :name, :email, :password, :presence => true

  # adds both unidirectional buddy relationships with another user
  def bebuddy(other_user)
    Buddyship.transaction do
      Buddyship.create(user_id: self.id, buddy_id: other_user.id)
      Buddyship.create(user_id: other_user.id, buddy_id: self.id)
    end
  end

  def unbuddy(other_user)
    Buddyship.transaction do
      Buddyship.where(user_id: self.id, buddy_id: other_user.id).destroy
      Buddyship.where(user_id: other_user.id, buddy_id: self.id).destroy
    end
  end

  def notes_by_language # worthwhile?
    notes_by_language = {}
    self.learning_languages.each do |learning_language|
      notes_by_language[learning_language] =
        notes.where(language_id: learning_language.id)
    end
    notes_by_language
  end

  # incomplete non-redundant buddy join table solution:
  #
  # has_many :buddyships
  # has_and_belongs_to_many :buddies,
  #   :finder_sql =>
  #   ('SELECT FROM buddyships WHERE ' +
  #   '(proposing_buddy_id = #{id} AND receptive_buddy_id = #{'????'}) OR ' +
  #   '(proposing_buddy_id = #{'___'} AND receptive_buddy_id = #{id})'),
  #   :insert_sql =>
  #   ('INSERT INTO buddyships (proposing_buddy_id, receptive_buddy_id)' +
  #   ' VALUES ('___', '___')'),
  #   :delete_sql =>
  #   ('DELETE FROM buddyships WHERE proposing_buddy_id = #{id} AND ' +
  #   'receptive_buddy_id = #{'___'}'),

end