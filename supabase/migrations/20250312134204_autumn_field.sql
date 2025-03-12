/*
  # Create predictions table for newsletter monetization calculator

  1. New Tables
    - `predictions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stats` (jsonb, stores newsletter statistics)
      - `revenue_model` (jsonb, stores calculated revenue projections)
      - `risk_level` (text, stores selected risk level)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `predictions` table
    - Add policies for authenticated users to manage their own predictions
*/

CREATE TABLE predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  stats jsonb NOT NULL,
  revenue_model jsonb NOT NULL,
  risk_level text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own predictions"
  ON predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own predictions"
  ON predictions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions"
  ON predictions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own predictions"
  ON predictions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);