FactoryBot.define do
  factory :user, class: User do
    factory :user_root do
      email { 'test@test.com' }
      password { 'password' }
      password_confirmation { 'password' }
    end

    factory :user1, parent: :user_root do
      # 必要に応じて属性を追加（例: handle_name など）
    end

    factory :user_new, parent: :user_root do
      # 別のユーザー用
    end
  end