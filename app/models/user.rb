class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i


validates :email,presence: true, format: { with: VALID_EMAIL_REGEX }
validates :name, presence: true,  length: { maximum: 6 }
validates :name, presence: true,  length: { maximum: 6 }
has_many :posts
        end
