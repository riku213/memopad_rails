require 'rails_helper'

RSpec.describe "Reserves", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/reserve/index"
      expect(response).to have_http_status(:success)
    end
  end

end
