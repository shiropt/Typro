require 'rails_helper'
describe User do

  describe '#create' do
  it "nickname、email、passwordとpassword_confirmationが存在すれば登録できること" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "nameがない場合は登録できないこと" do
    user = build(:user, name:"")
     user.valid?
     expect(user.errors[:name]).to include("can't be blank")
    end

    it "emailがない場合は登録できないこと" do
     user = build(:user, email:"")
     user.valid?
     expect(user.errors[:email]).to include("can't be blank")
    end

    it "passwordがない場合は登録できないこと" do
     user = build(:user, password:"")
     user.valid?
     expect(user.errors[:password]).to include("can't be blank")
    end
    
    it "passwordが存在してもpassword_confirmationがない場合は登録できないこと" do
      user = build(:user,password_confirmation:"")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("can't be blank")
      
    end
    
    it "nameが7文字以上であれば登録できないこと" do
      user = build(:user,name:"aaaaaaa")
      user.valid?
      expect(user.errors[:name]).to include("")
    end
    it "nameが6文字以下では登録できること" do
      user = build(:user,name:"aaaaaa")
      expect(user).to be_valid
    end
    
    it "重複したemailがあれば登録できないこと" do
      user = create(:user)
      anather_user = build(:user,email:user.email)
      anather_user.valid?
      binding.pry
      expect(user.errors[:email]).to include("has already been taken")
    end
  
    it "passwordが6文字以上であれば登録できること" do
      user = build(:user)
      expect(user).to be_valid
    end
    it "passwordが5文字以下であれば登録できないこと" do
      user = build(:user)
      expect(user).to be_valid
    end
  end
end