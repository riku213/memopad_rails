FactoryBot.define do
  factory :memo, class: Memo do
    factory :memo1 do
      id { 1 }
      association :category, factory: :c_todo
      content { "Python Report, by Oct. 29" }
    end

    factory :memo1_wrong, parent: :memo1 do
      category_id { 0 }
    end

    factory :memo1_new, parent: :memo1 do
      content { "Python Report, by Nov. 5" }
    end

    factory :memo2 do
      id { 2 }
      association :category, factory: :c_idea
      content { "Try Crystal Tutorial" }
    end
  end
end