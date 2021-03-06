module ControllerMacros
    def login_admin
      before(:each) do
        @request.env[“devise.mapping”] = Devise.mappings[:user]
        @user = FactoryBot.create(:user, role: ‘admin’)
        sign_in @user
        request.headers.merge!(@user.create_new_auth_token)
      end
    end
    def login_user
      before(:each) do
        @request.env[“devise.mapping”] = Devise.mappings[:user]
        @user = FactoryBot.create(:user)
        sign_in @user
        request.headers.merge!(@user.create_new_auth_token)
      end
    end
  end