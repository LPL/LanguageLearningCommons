class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable#, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me

	has_many :knowings
	has_many :learnings

	has_many :known_languages, :through => :knowings, :source => :language
	has_many :learning_languages, :through => :learnings, :source => :language
end
