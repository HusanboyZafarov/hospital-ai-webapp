import { MessageSquare, CheckCircle, XCircle, Coffee, Sun, Moon, Cookie } from 'lucide-react';

interface DietScreenProps {
  onAskAI: () => void;
}

export function DietScreen({ onAskAI }: DietScreenProps) {
  const meals = [
    { 
      icon: Coffee, 
      name: 'Breakfast', 
      time: '7:00 - 9:00 AM',
      foods: ['Oatmeal with berries', 'Greek yogurt', 'Whole wheat toast', 'Herbal tea'] 
    },
    { 
      icon: Sun, 
      name: 'Lunch', 
      time: '12:00 - 2:00 PM',
      foods: ['Grilled chicken breast', 'Steamed vegetables', 'Brown rice', 'Green salad'] 
    },
    { 
      icon: Moon, 
      name: 'Dinner', 
      time: '6:00 - 8:00 PM',
      foods: ['Baked salmon', 'Quinoa', 'Roasted vegetables', 'Fresh fruit'] 
    },
    { 
      icon: Cookie, 
      name: 'Snacks', 
      time: 'Anytime',
      foods: ['Almonds', 'Apple slices', 'Carrot sticks', 'Hummus'] 
    },
  ];

  const allowedFoods = [
    'Lean proteins (chicken, fish, turkey)',
    'Whole grains (brown rice, quinoa, oats)',
    'Fresh fruits and vegetables',
    'Low-fat dairy products',
    'Nuts and seeds (in moderation)',
    'Herbal teas and water',
  ];

  const forbiddenFoods = [
    'Spicy foods',
    'Alcohol',
    'Caffeine (coffee, energy drinks)',
    'Fried and greasy foods',
    'Processed meats',
    'High-sugar desserts',
    'Carbonated beverages',
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-light)',
      paddingBottom: '88px',
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'var(--bg-white)',
        padding: '16px',
        paddingTop: '24px',
        borderBottom: '1px solid var(--border-grey)',
      }}>
        <h2>Diet Plan</h2>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Diet Overview */}
        <div style={{
          backgroundColor: 'var(--bg-white)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}>
          <h3 style={{ marginBottom: '12px' }}>Diet Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--muted-text)' }}>Diet Type</p>
              <p>Post-Surgical Recovery</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--muted-text)' }}>Daily Calories</p>
              <p>1800-2000 kcal</p>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', marginTop: '8px' }}>
              <p className="caption" style={{ color: 'var(--muted-text)' }}>
                Doctor's Note: Focus on protein-rich foods and stay hydrated. Avoid foods that may cause inflammation.
              </p>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px' }}>Meals of the Day</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {meals.map((meal, index) => {
              const Icon = meal.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--bg-white)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--primary-blue)' + '15',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} style={{ color: 'var(--primary-blue)' }} />
                    </div>
                    <div>
                      <h3>{meal.name}</h3>
                      <p className="caption" style={{ color: 'var(--muted-text)' }}>{meal.time}</p>
                    </div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {meal.foods.map((food, foodIndex) => (
                      <li key={foodIndex} style={{ color: 'var(--dark-text)' }}>{food}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Allowed Foods */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px' }}>Allowed Foods</h3>
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allowedFoods.map((food, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <CheckCircle size={20} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
                  <p>{food}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forbidden Foods */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px' }}>Forbidden Foods</h3>
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {forbiddenFoods.map((food, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <XCircle size={20} style={{ color: 'var(--error-red)', flexShrink: 0, marginTop: '2px' }} />
                  <p>{food}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ask AI Button */}
        <button
          onClick={onAskAI}
          style={{
            width: '100%',
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <MessageSquare size={20} />
          Ask AI about foods
        </button>
      </div>
    </div>
  );
}
