json.extract! user, :id, :handle_name, :created_at, :updated_at
json.url user_url(user, format: :json)
