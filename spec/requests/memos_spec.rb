require 'rails_helper'

RSpec.describe "Memos", type: :request do
  # テストの前にデータを準備
  before :all do
    @category1 = FactoryBot.create(:c_todo)
    @category2 = FactoryBot.create(:c_idea)
    @memo1 = FactoryBot.create(:memo1)
    @memo2 = FactoryBot.create(:memo2)
  end

  # テスト後にデータを削除
  after :all do
    DatabaseCleaner.clean
  end

  describe "GET /index" do
    it "Successfully signed in, displays memos list page." do
      @user = FactoryBot.create(:user1)
      sign_in @user, scope: :user
      get memos_path
      expect(response).to have_http_status(200)
    end

    it "not signed in yet, redirect to login screen." do
      get memos_path
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "PATCH /update" do
    before do
      @user = FactoryBot.create(:user1)
      sign_in @user, scope: :user
    end

    context "when category_id is not null," do
      it "will be updated." do
        # メモの内容を更新するリクエスト
        patch memo_path(@memo1), params: { memo: FactoryBot.attributes_for(:memo1_new) }
        @memo1.reload

        # 内容が更新されているか確認
        expect(@memo1.content).to eq("Python Report, by Nov. 5")
        # 更新後に詳細画面へリダイレクトするか確認
        expect(response).to redirect_to(memo_path(@memo1))
      end
    end
  end
end